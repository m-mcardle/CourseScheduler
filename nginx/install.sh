#! /bin/bash
echo "Installing packages:"
sudo apt-get update

# Install NGINX
sudo apt install nginx

# Installing Node
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
echo "Finished installing packages"

# Installing Python
sudo apt-get install python3.6
sudo apt install python3.8-venv

echo "Configuring NGINX"
# Setup ufw
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 22/tcp
sudo ufw allow 'Nginx Full'
sudo ufw allow 8080

# Create SSL Certificate (Will require user input)
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

# Copy config files
sudo cp ./config/self-signed.conf /etc/nginx/snippets/self-signed.conf
sudo cp ./config/ssl-params.conf /etc/nginx/snippets/ssl-params.conf
sudo cp ./config/default.conf /etc/nginx/sites-available/default
sudo cp ./config/nginx.conf /etc/nginx/nginx.conf

# Restart NGINX
sudo systemctl restart nginx
echo "Finshed configuring NGINX"

echo "Installing npm packages"
# Install project dependencies
npm install
sudo npm install forever -g
sudo npm install pm2@latest -g
echo "Finished installing npm packages"
