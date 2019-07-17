FROM ubuntu:18.04

MAINTAINER "630140621@qq.com"

RUN echo "deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse\n# deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse\n# deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse\n# deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse\n# deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse\n# deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse" > /etc/apt/sources.list
RUN apt-get update && apt-get install -y wget xz-utils && apt-get clean

# WORKDIR ~
# RUN wget https://npm.taobao.org/mirrors/node/v10.16.0/node-v10.16.0.tar.gz && tar -xvf node-v10.16.0.tar.gz && rm node-v10.16.0.tar.gz # 源码
RUN wget https://npm.taobao.org/mirrors/node/v10.16.0/node-v10.16.0-linux-x64.tar.xz && tar -xf node-v10.16.0-linux-x64.tar.xz && rm node-v10.16.0-linux-x64.tar.xz
ENV PATH=$PATH:/node-v10.16.0-linux-x64/bin
RUN npm config set registry https://registry.npm.taobao.org/ && npm install -g pm2
