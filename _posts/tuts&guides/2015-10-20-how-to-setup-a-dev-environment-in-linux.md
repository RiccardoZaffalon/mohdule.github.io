---
layout: post
title: How To Setup A Web Development Environment In linux (Part 1)
category: Guides
tags: [web ,linux]
description: How To Setup A Web Development Environment In linux
---
In this post i'll help you to set up 
a web development environment in linux. 
<!--excerpt-->

Disclaimer: i havent tried PHP in linux yet but when i do
i will update this post.   

<br />

## 1-Linuxbrew
--- 

<br /> 

Linuxbrew is a fork of Homebrew, A Mac OS package manager.
with linuxbrew we can easily install various packages like (Nodejs , Ruby , ...etc).   
<br />

### #-Dependancies :  
  
You need to install a number of dependancies before you can install LinuxBrew. 

>Note: sometimes these dependancies fail to install if so retry again or find them in your favorite 
package manager.  

<br />

**Ubuntu or Debain**  

	sudo apt-get install build-essential curl git m4 ruby texinfo libbz2-dev libcurl4-openssl-dev libexpat-dev libncurses-dev zlib1g-dev

**Fedora**  

	sudo yum groupinstall 'Development Tools' && sudo yum install curl git m4 ruby texinfo bzip2-devel curl-devel expat-devel ncurses-devel zlib-devel
  
<br />

### #-installtion :  


	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)"
  
or alternatively you can do:

	git clone https://github.com/Homebrew/linuxbrew.git ~/.linuxbrew
  
Then paste these lines in your **.bashrc** or **.zshrc** file :

>export PATH="$HOME/.linuxbrew/bin:$PATH"  
export MANPATH="$HOME/.linuxbrew/share/man:$MANPATH"  
export INFOPATH="$HOME/.linuxbrew/share/info:$INFOPATH"

Your'e done, now lets proceed to the next step.  
  
<br />  

## 2-Ruby(rbenv) and Rails  
---  

<br /> 

### #-First we are going to install ruby using rbenv :  
rbenv is a ruby version manager used to get the latest version of ruby.  
There is another one called <a href="https://rvm.io/rvm/install" target="_blank">rvm</a> but i like rbenv more.  

First let's make sure that linuxbrew in up-to date by runing this on the terminal : 

	brew update

Then lets install rbenv 

	brew install rbenv ruby-build

<br /> 

Check you local ruby version on your machine by doing :

	ruby -v	

<br /> 

list all available versions in rbenv :
	
	rbenv install -l

Install a Ruby version for example let's say i want ruby (2.2.2) :
	
	rbenv install 2.2.2	

Then we set it to be global on your machine :  

	rbenv global 2.2.2

<br /> 

exit the terminal and open it again, and check your ruby version :  

	ruby -v

Hopefully you will see that the version we installed rbenv is successfully set to global.

<br />

If not, add the folowing line to your **.bashrc** file

>export PATH="$HOME/.rbenv/shims:$PATH" 

and run these commands :

	rbenv global 2.2.2
	rbenv rehash

then restart terminal and check your ruby version again.

<br />

Great now we have the latest version of Ruby installed  

<br />

### #-Lets install Rails :

Run this command to install rails for example i'll install version '4.2.1':  

	gem install rails -v 4.2.1

Restart your terminal and check if rails was installed :  
	
	rails -v
<br />  

>Note: You may want to reinstall rails using **sudo** in case the installtion fails.

To test it, lets create a new rails app :  

	rails new testApp
	cd testApp
	rails s

Open you browser and type **localhost:4000** you should get a page that says <a href="http://guides.rubyonrails.org/images/getting_started/rails_welcome.png" target="_blank">welcome aboard</a>  

## 3-NodeJs & NPM  
---  
First update linuxbrew to make sure that you have access to the latest 
pacakages :
	
	brew update

Then install node :

	brew install node

wait for linuxbrew to finish then restart the terminal and make sure that 
linuxbrew installed node and npm successfully : 

	node -v
	npm -v		

## Upgrades
---
If you want to upgrade your linuxbrew packages you can always do this :

	brew update
	brew upgrade x

>replace 'x' with the package name that you want to upgrade

If you had any trouble let me know in the comments.  