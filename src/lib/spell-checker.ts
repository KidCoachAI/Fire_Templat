import * as tf from '@tensorflow/tfjs';

/**
 * SpellChecker class for correcting spelling errors using the
 * nlpaueb/bert-base-uncased-spell-correction model.
 */

class SpellChecker {
  private model: tf.GraphModel | null = null;
  private tokenizer: any = null;
  private readonly modelPath = './models/model.json'; // Adjust as necessary

  async loadModel() {
    try {
      // Load the tokenizer
      const tokenizerResponse = await fetch('./models/tokenizer.json');
      this.tokenizer = await tokenizerResponse.json();
      console.log('Tokenizer loaded successfully.');

      // Load the TensorFlow.js model
      this.model = await tf.loadGraphModel(this.modelPath);
      console.log('Model loaded successfully.');
    } catch (error) {
      console.error('Error loading model or tokenizer:', error);
      throw error;
    }
  }

  private preprocess(text: string) {
    if (!this.tokenizer) {
      throw new Error('Tokenizer has not been loaded.');
    }

    // Tokenize the input text
    const tokens = text.split(' ').map((word: string) => {
      const encoded = this.tokenizer.model.vocab[word.toLowerCase()];
      return encoded !== undefined ? encoded : this.tokenizer.model.vocab['[unk]'];
    });

    // Add [CLS] and [SEP] tokens
    const input_ids = [this.tokenizer.model.vocab['[cls]'], ...tokens, this.tokenizer.model.vocab['[sep]']];

    // Add padding
    const max_length = 128; // Example max length
    const padding_length = Math.max(0, max_length - input_ids.length);
    const attention_mask = [...Array(input_ids.length).fill(1), ...Array(padding_length).fill(0)];
    const padded_input_ids = [...input_ids, ...Array(padding_length).fill(this.tokenizer.model.vocab['[pad]'])];

    // Create input tensors
    const input_ids_tensor = tf.tensor2d([padded_input_ids], [1, max_length], 'int32');
    const attention_mask_tensor = tf.tensor2d([attention_mask], [1, max_length], 'int32');

    return {
      input_ids: input_ids_tensor,
      attention_mask: attention_mask_tensor,
    };
  }

  private postprocess(prediction: tf.Tensor) {
    if (!this.tokenizer) {
      throw new Error('Tokenizer has not been loaded.');
    }

    // Get the predicted token index
    const predicted_index = prediction.argMax(-1).dataSync()[0];

    // Map back to text
    const word = Object.keys(this.tokenizer.model.vocab).find((key) => this.tokenizer.model.vocab[key] === predicted_index);

    return word || '[unk]';
  }

  async correct(text: string): Promise<string> {
    if (!this.model) {
      throw new Error('Model has not been loaded.');
    }

    try {
      // Preprocess the input text
      const { input_ids, attention_mask } = this.preprocess(text);

      // Run the model
      const prediction = await this.model.predict({
        input_ids: input_ids,
        attention_mask: attention_mask,
      }) as tf.Tensor;

      // Get the output of the model
      let result: string = "";
      if (Array.isArray(prediction)) {
        for (let i = 0; i < prediction.length; i++) {
          result += this.postprocess(prediction[i]) + " ";
        }
      } else {
        result = this.postprocess(prediction);
      }

      //dispose tensors
      input_ids.dispose();
      attention_mask.dispose();
      if(Array.isArray(prediction)) {
        prediction.forEach(tensor => tensor.dispose());
      } else {
        prediction.dispose();
      }

      return result.trim();
    } catch (error) {
      console.error('Error during spell correction:', error);
      return text;
    }
  }
}

export default SpellChecker;