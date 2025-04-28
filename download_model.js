import { pipeline, env } from '@xenova/transformers';
import * as fs from 'fs';
import * as path from 'path';

async function downloadModel() {
  env.useBrowserCache = false; // Disable browser cache for local downloading
  env.backends.default = 'local'; // Use local backend for downloading

  const modelId = 'Xenova/distilbert-base-uncased-finetuned-consumer-complaint-sentiment';
  const modelDir = path.join(process.cwd(), 'models');

  // Create the models directory if it doesn't exist
  if (!fs.existsSync(modelDir)) {
    fs.mkdirSync(modelDir, { recursive: true });
  }

  console.log(`Downloading model ${modelId} to ${modelDir}...`);

  try {
    // Create the pipeline instance
    const pipe = await pipeline(
      'text-classification',
      modelId,
      {
        quantized: true,
        progress_callback: (data) => {
            console.log(data)
        }
      },
    );

    console.log('Model downloaded successfully.');
  } catch (error) {
    console.error('Error downloading model:', error);
  }
}

downloadModel();