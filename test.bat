@echo off
REM Command 1: Copy the startup script to the VM instance
gcloud compute scp startup-script.sh instance-20241219-231215:~ --zone=us-central1-c

REM Command 2: SSH into the VM instance and run the startup script
gcloud compute ssh instance-20241219-231215 --zone=us-central1-c --command="sudo bash ~/startup-script.sh"
