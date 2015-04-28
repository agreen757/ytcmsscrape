/*
LOG INTO THE YOUTUBE CMS AND DO A SEARCH USING A HEADLESS BROWSER.
USING SPOOKYJS TO TIE CASPERJS INTO NODE.JS.

*/

var Spooky = require('spooky')
var url = 'https://www.youtube.com/content_id?o=krCThOPEJqqsS2LErhc1JQ#asset/s';
var fs = require('fs')


var spooky = new Spooky({
    //SET THE LOGGING LEVEL
    //***********************
    casper: {
        logLevel: 'debug',
        verbose: true
    },
    options:{
        clientScripts: ['./bower_components/jquery/dist/jquery.min.js']
    }
},
    function(err){
        spooky.start(url);
        spooky.then(function(){
            this.fill('form#gaia_loginform',{
                Email:"EMAIL",
                Passwd:"PASSWORD"
            },true);
        })
        
        //ON CLAIMS PAGE
        spooky.wait(7000,function(){
            this.capture('page-a.png',{
                top:0,
                left:0,
                width:900,
                height:900
            })
            this.click('#creator-sidebar-section-id-ASSETS h3 a')
        })
        
        //ON ASSETS PAGE
        spooky.wait(4000,function(){
            this.capture('page2.png',{
                top:0,
                left:0,
                width:900,
                height:900
            })
            this.sendKeys('#gwt-debug-ASSET_SEARCH_SEARCH_BOX textarea','STONESTHROW')
            this.click('#gwt-debug-ASSET_SEARCH_SEARCH_BOX button');
            })
        
        //SEARCHING ASSETS
        spooky.wait(7000,function(){
            this.capture('page3.png',{
                top:0,
                left:0,
                width:900,
                height:900
            });
            var p = this.evaluate(function(){
                var g = document.querySelector('#gwt-debug-SELECTION_TABLE_RESULT_TABLE tbody').getElementsByClassName('HLIIE3-b-u');
                return g;
            });
            this.emit('get search results',p);
        })
        
            //EXECUTE
            spooky.run();
    })


//LOG THE SEARCH RESULTS AFTER RECEIVING THE EMIT FROM THE LAST WAIT FUNCTION
//*******************************************
spooky.on('get search results',function(p){
    var html = p['0'].innerHTML;
    var silo = [];
    for(var i=0;i<=p.length;i++){
        var q = i.toString();
        if(p[q] != null){
            console.log(p[q].innerText)      
        }
    }
   
    
})
//*******************************************

spooky.on('error', function (e, stack) {
    console.error(e);

    if (stack) {
        console.log(stack);
    }
});

spooky.on('console', function (line) {
    console.log(line);
});