#! /bin/bash
echo "Configuring NGINX"
# Copy config files
sudo cp ./config/self-signed.conf /etc/nginx/snippets/self-signed.conf
sudo cp ./config/ssl-params.conf /etc/nginx/snippets/ssl-params.conf
sudo cp ./config/default.conf /etc/nginx/sites-available/default
sudo cp ./config/nginx.conf /etc/nginx/nginx.conf

# Restart NGINX
sudo systemctl restart nginx
echo "Finshed configuring NGINX"
