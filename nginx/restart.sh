#! /bin/bash
echo "Configuring NGINX"
# Copy config files
sudo cp self-signed.conf /etc/nginx/snippets/self-signed.conf
sudo cp ssl-params.conf /etc/nginx/snippets/ssl-params.conf
sudo cp default.conf /etc/nginx/sites-available/default
sudo cp nginx.conf /etc/nginx/nginx.conf

# Restart NGINX
sudo systemctl restart nginx
echo "Finshed configuring NGINX"
