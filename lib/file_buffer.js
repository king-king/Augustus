/**
 * Created by wangqun6 on 2017/3/24.
 * 提供写入文件的buffer版
 */

var os = require( "os" ) ,
	fs = require( "fs" );

var enter_char = Buffer.from( os.EOL , "utf-8" );

function writer ( src ) {
	// 仅处理utf-8的字符串
	var stream = fs.createWriteStream( src , {
		flags : 'a'
	} );
	var status = true;
	var count = 0;
	var isClose = false;
	var buffLen = 0;
	var buffs = [];

	function writeTosStream ( buffer ) {
		if ( !isClose ) {
			status = stream.write( buffer );
			function process () {
				// 写满了，后续内容加到bufferString中,直到drain事件被触发
				!status && stream.once( "drain" , function () {
					if ( !isClose ) {
						// 有可能写了之后继续超过buffer
						status = stream.write( Buffer.concat( buffs , buffLen ) );
						buffs = [];
						buffLen = 0;
						!status && process();
					}
				} );
			}

			process();
		}
	}

	function writeToBuffer ( buffer ) {
		buffs.push( buffer );
		buffLen += buffer.length;
	}

	return {
		write : function ( buffer ) {
			if ( !isClose ) {
				buffer = count++ ? Buffer.concat( [ enter_char , buffer ] , enter_char.length + buffer.length ) : buffer;
				if ( status ) {
					writeTosStream( buffer );
				} else {
					writeToBuffer( buffer );
				}
			}
		} ,
		close : function () {
			buffLen && stream.end( Buffer.concat( buffs , buffLen ) );
			isClose = true;
		}
	};
}

module.exports.writer = writer;