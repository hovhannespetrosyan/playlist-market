'use strict';
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

//const config =require('../config/config');
//var oauth2Client = new OAuth2(config.google.clientID,config.google.clientSecret,config.google.callbackURL);

var youtube_api_model = function YoutubeApiModel(config,accessToken,refreshToken)
{
    this.oauth2Client = new OAuth2(
        config.google.clientID,
        config.google.clientSecret,
        config.google.callbackURL
    );
    this.oauth2Client.setCredentials({
        access_token:   accessToken,
        refresh_token:  refreshToken
    });
    this.youtube = google.youtube({
        version: "v3",
        auth:this.oauth2Client
    });
    var fake_this = this;

    this.getPlaylistData = function getPlaylistData(){
        return new Promise(function (res,rej){
            fake_this.youtube.playlists.list({
                part:'snippet, contentDetails',
                mine:"true",
                maxResults : 25
            },function (err,data){
                if(err){
                    console.error('Error' + err);
                    return rej();
                }
                if(data){
                    res(data);
                }
            });
        });
    };

    this.getPlaylistItems = function getPlaylistItems(id){
        return new Promise(function (res,rej){
            fake_this.youtube.playlistItems.list({
                part:'snippet, contentDetails',
                playlistId: id,
                mine:"true",
                maxResults : 25
            },function (err,data){
                if(err){
                    console.error('Error' + err);
                    return rej();
                }
                if(data){
                    res(data);
                }
            });
        });
    };
};

module.exports = youtube_api_model;