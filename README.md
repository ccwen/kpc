kpc
===

KsanaPC based on modern workflow

Video Tutorial (in Madarin)
https://docs.google.com/document/d/1-5w6IxBsqU5kdpOX9bQyleYBB3mGveywHH4IutlMM6M/pub

setup
====
    git clone https://github.com/ksanaforge/kpc
    cd kpc
    npm install

Install and run sample
====
    cd kpc
    grunt sample
    cd kpc-app-sample
    grunt run
    
Debugging
====
open http://127.0.0.1:9222 in Chrome

Server mode
====
    cd kpc-app-sample
    grunt server
    start http://127.0.0.1:2555
    
new Application
====
    cd kpc
    mkdir mynewapp
    git init
    grunt newapp --name=mynewapp
    
new Component
====
    cd mynewapp
    grunt newcomponent --name==mynewapp/newcomp

dependency to new component will be added to mynewapp/component.json

