const router = require('koa-router')();
const passport = require('./passport');
const config = require('../config/config');
const youtube = require('./youtube');

var {Users,Orders,Sales}= require('./model');
// there we define appropriate function names which will work then


router.get('/',main);
router.get('/main',main);
router.get('/login',login);
router.get('/store',store);
router.get('/my_playlists',my_playlists);
router.get('/playlist_page',playlist_page);
router.get('/bought_playlists',bought_playlists);
router.get('/account',account);
//router.get('/payment',payment);
/*router.get('/playlist',playlist);
router.get('/playlists',playlists);*/
router.get('/logout', logout);
//router.get('/dashboard',dashboard);
router.get('/auth/google',passport.authenticate('google',{
    scope:  config.google.scope,
    accessType: config.google.accessType,
    approvalPrompt: config.google.approvalPrompt
}));
router.get('/auth/google/callback',passport.authenticate('google',{
    successRedirect:    '/account',
    failureRedirect:    '/'
}));

// there are such functions those respond to urls

/*async function dashboard(ctx)
{
    await ctx.render('login',{userInfo:ctx.state.user});
}*/
async function playlist_page(ctx)
{
   //var playlist_items = await youtubeCl.getPlaylistItems(ctx.params.id);
   // console.log(555555555555555555555555555);
   await ctx.render('playlist_page',{
    userInfo:ctx.state.user
    //playlist_items:playlist_items
   });
}
async function my_playlists(ctx)
{
        var playlist_data;
        var playlist_item;
        await  Users.findOne({where:{googleID : ctx.state.user.id}}).then(async (USER) => {
        console.log("1----------------------------------");
        console.log(USER.refreshToken);
        console.log("1----------------------------------");

        var   youtubeCl = new youtube(config, USER.accessToken,USER.refreshToken);

        playlist_data = await youtubeCl.getPlaylistData();

        playlist_item = await youtubeCl.getPlaylistItems(playlist_data.items[0].id);

        console.log('2*/*/*/*/*/*/*/*/*/*/');
        console.log(playlist_data.items[0]);
        console.log('2*/*/*/*/*/*/*/*/*/*/');

        console.log("3----------------------------------hjgkjhgkuhkjkjhgjg");
        console.log(playlist_data.items[0].thumbnails);
        console.log("3----------------------------------");
        /*playlist_items = await youtubeCl.getPlaylistsItems(ctx.params.id);*/
    });
    await ctx.render('my_playlists',{
        userInfo:ctx.state.user,
        ydata:playlist_data
    });
    //console.log(ctx.state.user.refreshToken);
}

async function bought_playlists(ctx)
{
    await ctx.render('bought_playlists',{userInfo:ctx.state.user});
}

async function store(ctx)
{
    await ctx.render('store',{userInfo:ctx.state.user});
}
async function login(ctx)
{
    await ctx.render('login',{userInfo:ctx.state.user});
}

async function logout(ctx)
{
    ctx.logout();
    ctx.redirect('/login');
}
/*async function create(ctx)
{
    await ctx.render('create');
}*/
async function main(ctx)
{
    await ctx.render('main',{userInfo:ctx.state.user});
}
async function account(ctx)
{
    await ctx.render('account',{userInfo:ctx.state.user});

    //console.log(youtube_api);
    Users.upsert({
            googleID:   ctx.state.user.id,
            accessToken: ctx.state.user.accessToken,
            refreshToken:   ctx.state.user.refreshToken
        }
    );
    //sqlz.upsertUser(ctx.state.user.id,ctx.state.user.accessToken,ctx.state.user.refreshToken);
}
/*async function payment(ctx)
{
    await ctx.render('payment');
}
async function playlist(ctx)
{
    await ctx.render('playlist');
}
async function playlists(ctx)
{
    await ctx.render('playlists');
}*/
module.exports = router;