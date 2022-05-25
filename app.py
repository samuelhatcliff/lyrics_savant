"""General Imports"""
from flask import Flask, jsonify, request, render_template
import json
from lyricsgenius import Genius
from types import SimpleNamespace

"""Web Scraping"""
# import requests
# from bs4 import BeautifulSoup
# URL = "https://www.songkick.com/leaderboards/popular_artists?page=5"
# page = requests.get(URL)
# soup = BeautifulSoup(page.content, "html.parser")
# results = soup.find_all("td", class_="name")
# artist_list = []
# for td in results:
#     a= td.find("a")
#     artist_list.append(a.text)


# from flask_debugtoolbar import DebugToolbarExtension 

"""Imports from our own costum modules"""
from models import connect_db, db, Song, Artist
from api import serialize_artist, serialize_song
from math_helpers import Math
from python_data_visuals import Python_Data_Visuals
from lyrics_api import download_artist
pd = Python_Data_Visuals()
math = Math()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///lyrics-db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "topsecret1"
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# debug = DebugToolbarExtension(app)

connect_db(app)

db.create_all()

genius = Genius('aPt0Y03tHHx7XAVyDWcJUzgaR7qBN5_D1-Dg_s-BBgTO8ifIJUB0toLzQ0P2YKCF')
#modifies our genius object with params to narrow down search results
genius.excluded_terms = ["(Remix)", "(Live)"]
genius.skip_non_songs = True
genius.remove_section_headers = True
genius.retries = 1

completed = []
failed = []

@app.route("/")
def home():
    artists = Artist.query.all()
    print("Available Artists:", artists)
    return render_template('home.html')

@app.route("/results")
def results():
    id1 = request.args["id1"]
    id2 = request.args["id2"]

    """WordCloud"""
    lyrics = math.generate_composite(id1)
    wc_img = pd.get_wordcloud(lyrics)

    """Pie Chart"""
    pie_img = pd.get_pie(id1)

    """Unique Words Bar Chart"""
    bar_img = pd.get_unique_words_bar(id1, id2)
  
    """Polarity Bar Chart"""
    pol_img = pd.get_pol_bar(id1, id2)

    return render_template('results.html', wc_img = wc_img, pie_img = pie_img, bar_img = bar_img, pol_img = pol_img)



"""RESTFUL API"""

@app.route("/api/artists/")
def get_all_artists():
    """Return JSON for all artists in database"""
    artists = Artist.query.all()
    serialized = [serialize_artist(a) for a in artists]
    return jsonify(artists=serialized)

@app.route("/api/artists/<int:id>")
def get_artist(id):
    """Return JSON for a specific artist in database"""
    artist = Artist.query.get(id)
    serialized = serialize_artist(artist)
    return jsonify(artists=serialized)

@app.route("/api/artists/<int:id>/songs")
def get_songs_by_artist(id):
    artist = Artist.query.get(id)
    serialized = [serialize_artist(song) for song in artist.songs]
    return jsonify(songs=serialized)

@app.route("/api/artists/<int:artist_id>/<int:song_id>")
def get_song_by_artist(artist_id, song_id):
    artist = Artist.query.get(artist_id)
    print(artist)
    song = Song.query.get(song_id)
    serialized = serialize_song(song)
    return jsonify(songs=serialized)

@app.route("/api/artists/", methods=["POST"])
def add_artist():
    name = request.json["name"]
    quantity = request.json["quantity"]
    our_artist = download_artist(name, quantity)
    response = jsonify(serialize_artist(our_artist))
    return (response, 201)



#https://lyricsgenius.readthedocs.io/en/master/reference/genius.html
# https://lyricsgenius.readthedocs.io/en/master/reference/types.html



