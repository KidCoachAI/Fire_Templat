from huggingface_hub import hf_hub_download
import os

model_id = "Xenova/distilbert-base-uncased-finetuned-consumer-complaint-sentiment"
model_dir = "models"

if not os.path.exists(model_dir):
    os.makedirs(model_dir)

filenames = [
    "config.json",
    "model.safetensors",
    "tokenizer.json",
    "tokenizer_config.json",
    "vocab.txt",
    "special_tokens_map.json",
]

for filename in filenames:
    try:
        hf_hub_download(
            repo_id=model_id,
            filename=filename,
            local_dir=model_dir,
            local_dir_use_symlinks=False,
        )
        print(f"Downloaded {filename} successfully.")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")