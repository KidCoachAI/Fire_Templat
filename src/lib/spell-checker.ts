import { pipeline, ProgressCallback } from '@xenova/transformers/dist/transformers.js';

/**
 * SpellChecker class for correcting spelling errors using the
 * nlpaueb/bert-base-uncased-spell-correction model.
 */




class SpellChecker {
  private corrector: any | null = null;;


    /**
   * Loads the spell correction model with optional progress callback and model ID
   * @param options - Optional object with progressCallback and model_id
   */
  async loadModel(options?: { progressCallback?: ProgressCallback; model_id?: string }) {
    const { progressCallback, model_id = './models' } = options || {};
    try {
      // Load the text2text-generation pipeline with the specified model ID and custom loading function
      this.corrector = await pipeline(
        'text2text-generation',
        model_id,
        { progress_callback: progressCallback, quantized: true}
      );
      this.corrector.model.config.local_files_only = true;
    } catch (error) {
      console.error('Error loading spell checker model:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  /**
   * Corrects the spelling of the given text using the loaded model.
   *
   * @param text - The input string to be corrected.
   * @returns A promise that resolves with the corrected string.
   */
  async correct(text: string): Promise<string> {
    // Check if the model is loaded
    if (!this.corrector) {
      throw new Error('Spell checker model has not been loaded.');
    }
    try {
      // Use the loaded pipeline to correct the text.
      const result = await this.corrector(text, {
        max_length: 128,
        num_return_sequences: 1,
      });

      if (result && result.length > 0) {
        // Return the first generated text from the result.
        return result[0].generated_text;
      } else {
        // Return the original text if no correction was made.
        return text;
      }
    } catch (error) {
      console.error('Error during spell correction:', error);
      return text;
    }
  }
}

export default SpellChecker;