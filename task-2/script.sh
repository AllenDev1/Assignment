#!/bin/bash

# Set the source file and backup directory
src_file="/var/data/api.data"
backup_dir="/var/backup/api"

# Create the backup directory if it doesn't exist
mkdir -p "$backup_dir"

# Generate the backup filename
backup_filename="apidata_$(date +%Y%m%d%H%M).bak"
backup_file="$backup_dir/$backup_filename"

# Copy the source file to the backup directory
cp "$src_file" "$backup_file"

# Keep only the 10 most recent backup files and remove the rest
cd "$backup_dir"
ls -t | sed -e '1,10d' | xargs -d '\n' rm
