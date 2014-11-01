$(function(){

	$('#addTeam').on('click', function(){
		console.log('working')
		$.post('/teams', {team:$('#team').val(), password:$('#password').val()}).done(function(response){
			console.log(response)
		})
	})
	$('#login').on('click', function(){
		console.log('working')
		$.post('/login', {team:$('#team_login').val(), password:$('#password_login').val()}).done(function(response){
			if(response == 'inside'){
				location.href ='/game'
			}
		})
	})
	$('#addBar').on('click', function(){
		$.post('/bar', {name:$('#name').val(), score:$('#score').val()}).done(function(response){
			console.log(response)
			$('.yourScore').empty()
			$(".leaderboard").empty()
			var bars = JSON.parse(response)
			var total = 0
			$('.yourScore').append('<tr><td>Bar Name</td><td>Score</td></tr>')

			bars.forEach(function(name){

				$('.yourScore').append('<tr><td>'+name.name+'</td><td>'+name.score+'</td></tr>')

			})
			$('.totalScore').text(total)

			$.get('/leaderboard').done(function(response2){
				$('.leaderboard').empty()
				leaders = JSON.parse(response2)
				$('.leaderboard').append('<tr><td>Team Name</td><td>Score</td></tr>')
				leaders.forEach(function(leader){
					$('.leaderboard').append('<tr><td>'+leader.team+'</td><td>'+leader.score+'</td></tr>')


				})
			})
		})

	})

	$.get('/user_bars').done(function(response){
		var bars = JSON.parse(response)
		var total = 0
		$('.yourScore').append('<tr><td>Bar Name</td><td>Score</td></tr>')

		bars.forEach(function(name){

			total = total + parseInt(name.score)

			$('.yourScore').append('<tr><td>'+name.name+'</td><td>'+name.score+'</td></tr>')

		})
		$('.totalScore').text(total)

	})
			$.get('/leaderboard').done(function(response2){
			$('.leaderboard').empty()
			leaders = JSON.parse(response2)

			$('.leaderboard').append('<tr><td>Team Name</td><td>Score</td></tr>')
			leaders.forEach(function(leader){
				$('.leaderboard').append('<tr><td>'+leader.team+'</td><td>'+leader.score+'</td></tr>')


			})
		})

	setInterval(function(){
		$.get('/leaderboard').done(function(response2){
			$('.leaderboard').empty()
			leaders = JSON.parse(response2)

			$('.leaderboard').append('<tr><td>Team Name</td><td>Score</td></tr>')
			leaders.forEach(function(leader){
				$('.leaderboard').append('<tr><td>'+leader.team+'</td><td>'+leader.score+'</td></tr>')


			})
		})
	},5000)





})