#! /bin/bash
echo "Installing packages:"
sudo apt-get update

# Install NGINX
sudo apt install nginx

# Installing Node
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
echo "Finished installing packages"

echo "Configuring NGINX"
# Setup ufw
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 22/tcp
sudo ufw allow 'Nginx Full'

# Create SSL Certificate (Will require user input)
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

# Copy config files
sudo cp self-signed.conf /etc/nginx/snippets/self-signed.conf
sudo cp ssl-params.conf /etc/nginx/snippets/ssl-params.conf
sudo cp default.conf /etc/nginx/sites-available/default
sudo cp nginx.conf /etc/nginx/nginx.conf

# Restart NGINX
sudo systemctl restart nginx
echo "Finshed configuring NGINX"

echo "Installing npm packages"
# Install project dependencies
npm install
sudo npm install forever -g
echo "Finished installing npm packages"


echo "Starting server"
# Forever starts the server indefinetly
forever start -c "npm start" ./

# Don't think this is needed
# sudo npm cache clean -f
# sudo npm install -g n
# sudo n stable

# sudo npm -g install create-react-app
