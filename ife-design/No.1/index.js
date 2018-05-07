var line = document.getElementsByClassName('line')[0];
function changeStyle(){
	var but = document.getElementById('but');
	var text = document.getElementById('text');
	text.className = text.className === 'text1' ? 'text2' : 'text1';
	var line = document.getElementById('line');
	line.className = line.className === 'line1' ? 'line2' : 'line1';
}