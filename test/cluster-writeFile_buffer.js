/**
 * Created by wangqun6 on 2017/3/24.
 */
// process.env.NODE_DEBUG = 'fs';

var t = require( "../lib/tool" );
var fs = require( "fs" );
var writer = require( "../lib/file" );

var pid = process.pid;
var src = "e:/LOGS/out" + pid + ".log";

var t0 = Date.now();
var w = writer.writer( src );
var buffer = Buffer.from( "{\"index\":0}" , "utf-8" );
t.loop( 1000000 , function ( i ) {
	w.write( buffer );
} );
w.close();
var codet = Date.now() - t0;

process.on( "exit" , function () {
	console.log( pid + " exit： " + (Date.now() - t0) + "ms  code spend：" + codet + "ms" );
} );



