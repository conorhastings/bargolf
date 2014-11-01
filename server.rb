require 'bundler/setup'
Bundler.require(:default)
require 'active_record'
require_relative './lib/models/bar'
require_relative './lib/models/team'
require_relative './lib/models/team_member'
require_relative './config/environments'
require 'sinatra/reloader'
require 'pry'

enable :sessions

after do
	ActiveRecord::Base.connection.close
end


get('/') do
	erb(:index)
end

post('/teams') do

	team = Team.create(team:params[:team],password:params[:password])
	'cool'
end

post('/login') do
	team = Team.find_by(team:params[:team])
	if(team)
		if(team[:password]==params[:password])
			session[:id] = team[:id]
			'inside'
		end
	end
end

get('/game') do
	if(session[:id])
		erb(:game)
	else
		'not logged in'
	end
end

post('/bar') do
	Bar.create(team_id:session[:id],name:params[:name],score:params[:score])
	Bar.where(team_id:session[:id]).to_json
end

get('/user_bars') do
	Bar.where(team_id:session[:id]).to_json

end

get('/leaderboard') do

	teams = Team.all
	leaderboard = []
	teams.each do |team|
		bars = Bar.where(team_id:team[:id])
		total_score = 0
		bars.each do |bar|
			total_score += bar.score
		end
		leaderboard.push({team:team[:team],score:total_score})
	end
	leaderboard.sort_by{ |leader| leader[:score] }
	leaderboard.to_json
end








