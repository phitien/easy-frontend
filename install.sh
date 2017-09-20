#!/bin/sh
cat ~/.bash_profile | sed '/EZY_HOME/d' 2>&1 | tee ~/.bash_profile && echo export EZY_HOME="$(pwd)" >> ~/.bash_profile
npm install -g
