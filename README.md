Just a dss parser task

You can add additional dss parsers eg:

````
dss({
    parsers : {
        'parserName' : function(i,line,block,file) {
            return line
        },
        'template' : function(i,line,block,file) {
            return line
        },
    }
})
````

