import * as types from './mutation-types'

const matutation = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    },
    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state, list) {
        state.playlist = list
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    [types.SET_DISC](state, disc) {
        state.disc = disc
    },
    [types.SET_ALBUM](state, album) {
        state.album = album
    },
    [types.SET_TOP_LIST](state, topList) {
        state.topList = topList
    },
    [types.SET_SEARCH_HISTORY](state, histroy) {
        state.searchHistory = histroy
    },
    [types.SET_PLAY_HISTORY](state, histroy) {
        state.playHistory = histroy
    },
    [types.SET_FAVORITE_LIST](state, list) {
        state.favoriteList = list
    }
}
export default matutation