export const birthday = {
 name: 'Ovini Dissanayake', shortName: 'Ovini', birthdayDay: 5, birthdayMonth: 10, timeZone: 'Asia/Colombo',
 musicVolume: 0.45,
 music: '/audio/birthday-song.mp3', fallbackMusic: '/audio/birthday-melody.wav',
 photos: [
 ['A smile I could look at forever.', 'Your smile'],
 ['One of those moments I never want to forget.', 'The little things'],
 ['Somehow, you make everything brighter.', 'A little sunshine'],
 ['My favourite kind of happiness.', 'Just us'],
 ['Beautiful memories with my favourite person.', 'My favourite person'],
 ['A moment worth keeping forever.', 'Forever moments'],
 ['Life feels better with you in it.', 'With you'],
 ['And there are still so many memories left to make.', 'Our next chapter'],
 ].map(([caption,title],i)=>({src:`/images/ovini-${String(i+1).padStart(2,'0')}.jpg`,caption,title,alt:`Ovini — ${title}`})),
 timeline: [
 {title:'The day I met you',text:'Some people enter your life quietly, and somehow change everything.'},
 {title:'The little moments',text:'The conversations, the laughter, the smiles. Somewhere in those ordinary moments, you became extraordinary to me.'},
 {title:'The memories we made',text:'If I could keep a moment in my pocket, it would be one spent with you.'},
 {title:'And everything still ahead…',text:'More adventures. More laughter. More ordinary days made beautiful, together.'},
 ],
 loveReasons:['Your smile','Your kind heart','The way you laugh','Your beautiful eyes','How you make everything better','Simply being you'],
 letter: ["Today isn't special only because it's your birthday. It's special because it's the day someone incredibly beautiful, kind and unforgettable entered the world.","Thank you for every smile, every memory, every conversation, and every little moment that became important simply because you were part of it.","I hope this year gives you as much happiness as you bring into the lives of the people who love you.","Happy Birthday, beautiful. ♡"],
};
