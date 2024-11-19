const PORT = process.env.PORT || 8081
const CONNSTR = process.env.CONNSTR
const BASE = process.env.BASE
const PERSISTENCE = process.env.PERSISTENCE || "Mongo"
const GIPHYKEY = process.env.GIPHYKEY
const ROLE = process.env.ROLE
const DEFAULTGIF = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzhobmlvYnd2N3dsYzcydmhwa212cHNteHZyMmQ5OG45aHlhcnNlZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7L3RWrFXiJiUg/giphy.gif"

export default {
    PORT,
    CONNSTR,
    BASE,
    PERSISTENCE,
    GIPHYKEY,
    ROLE,
    DEFAULTGIF
}
