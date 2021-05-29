#!/usr/bin/perl

print "Cache-Control: no-cache\n";
print "Content-type: text/html\n\n";
print '<html>
  <head>
  	<title>CGI Form</title>
  </head>
  	<body>
  		<h1 align=center>Session Test</h1>
		<hr/> 
		<p>CGI using Perl Language</p>
		<form style="margin-top: 30px;" action="/cgi-bin/perl-sessions-1.pl" method="POST">
			<label>
				What is your name?
				<input type="text" name="username" autocomplete="off" />
			</label>
			<input type="submit" value="Test Sessioning" />
		</form>
		<a href="/" style="display: inline-block; margin-top: 20px;">Home</a>
	</body>
</html>';
