#! /bin/bash
echo "Installing packages:"
sudo apt-get update

# Install NGINX
sudo apt install nginx

# Installing Node
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

sudo npm cache clean -f
sudo npm install -g n
sudo n stable


sudo npm -g install create-react-app