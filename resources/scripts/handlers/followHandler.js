(function(){var e=0,l=0,o=false,s=$.inidb.exists("settings","followReward")?parseInt($.inidb.get("settings","followReward")):100,a=$.inidb.exists("settings","followMessage")?$.inidb.get("settings","followMessage"):$.lang.get("followhandler.follow.message");function n(){if($.systemTime()-e>3e5){if(l==3){$.say($.lang.get("followhandler.followtrain.triple"))}else if(l==4){$.say($.lang.get("followhandler.followtrain.quad"))}else if(l==5){$.say($.lang.get("followhandler.followtrain.penta"))}else if(l==20){$.say($.lang.get("followhandler.followtrain.mega",l))}else if(l==30){$.say($.lang.get("followhandler.followtrain.ultra",l))}else if(l==50){$.say($.lang.get("followhandler.followtrain.unbelievable",l))}else{++l}}else{l=1}e=$.systemTime()}$.bind("twitchFollowsInitialized",function(){if(!$.bot.isModuleEnabled("./handlers/followHandler.js")){return}$.consoleLn($.lang.get("followhandler.anouncements.enabled"));o=true});$.bind("twitchFollow",function(e){var l=$.username.resolve(e.getFollower()),r=a;if(!$.inidb.exists("followed",l)&&$.bot.isModuleEnabled("./handlers/followHandler.js")){if(s>0){$.inidb.incr("points",l.toLowerCase(),s)}if(o){r=r.replace("(name)",l).replace("(reward)",s);$.say(r)}n();$.inidb.set("followed",l,true);$.writeToFile($.username.resolve(l),"./addons/followHandler/latestFollower.txt",false)}});$.bind("twitchFollow",function(e){if(!$.bot.isModuleEnabled("./handlers/followHandler.js")){return}var l=e.getFollower().toLowerCase();if($.inidb.exists("followed",l)){return}if($.bot.isModuleEnabled("./commands/lastseenCommand.js")){$.inidb.set("lastseen",l,$.systemTime())}if(s>0){$.inidb.incr("points",l,s)}if(o){if(s>0){$.say($.lang.get("followhandler.new.follow",$.username.resolve(l),$.getPointsString(s)))}else{$.say($.lang.get("followhandler.new.follow.noreward",$.username.resolve(l)))}}$.setIniDbBoolean("followed",l,true);$.writeToFile($.username.resolve(l),"./addons/followHandler/latestFollower.txt",false);n()});$.bind("twitchUnfollow",function(e){if(!$.bot.isModuleEnabled("./handlers/followHandler.js")){return}var l=e.getFollows().toLowerCase(),o=$.getIniDbBoolean("followed",l);if(o){$.setIniDbBoolean("followed",l,false)}});$.bind("command",function(e){var l=e.getSender().toLowerCase(),o=e.getCommand(),n=e.getArgs(),r=e.getArguments();comArg=n[0];if(o.equalsIgnoreCase("followreward")){comArg=parseInt(comArg);if(!comArg||isNaN(comArg)){$.say($.whisperPrefix(l)+$.lang.get("followhandler.set.followreward.usage",$.pointNameMultiple))}s=comArg;$.inidb.set("settings","followReward",s);$.say($.whisperPrefix(l)+$.lang.get("followhandler.set.followreward.success",$.getPointsString(s)))}if(o.equalsIgnoreCase("followmessage")){if(!comArg||isNaN(comArg)){$.say($.whisperPrefix(l)+$.lang.get("followhandler.set.followmessage.usage"))}a=r;$.inidb.set("settings","followMessage",a);$.say($.whisperPrefix(l)+$.lang.get("followhandler.set.followmessage.success"))}if(o.equalsIgnoreCase("followers")){$.say($.lang.get("followhandler.followers",$.getFollows($.channelName)))}if(o.equalsIgnoreCase("checkfollow")){comArg=comArg.toLowerCase();if(!comArg||comArg==""){$.say($.whisperPrefix(l)+$.lang.get("followhandler.check.usage"));return}if($.user.isFollower(comArg)){$.say($.lang.get("followhandler.check.follows",$.username.resolve(comArg)))}else{$.say($.lang.get("followhandler.check.notfollows",$.username.resolve(comArg)))}}});$.bind("initReady",function(){if($.bot.isModuleEnabled("./handlers/followHandler.js")){$.registerChatCommand("./handlers/followHandler.js","followreward",1);$.registerChatCommand("./handlers/followHandler.js","followmessage",1);$.registerChatCommand("./handlers/followHandler.js","checkfollow",2);$.registerChatCommand("./handlers/followHandler.js","followers",7)}})})();