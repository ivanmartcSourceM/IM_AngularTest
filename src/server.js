const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/ng-blog'));
app.get('/', function(req,res){
    
})