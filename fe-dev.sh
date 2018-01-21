#!/usr/bin/env bash

docker run -ti -v $(pwd):'/myapp' -p 4200:4200 -p 49152:49152 -p 7020:7020 danlynn/ember-cli:latest bash
