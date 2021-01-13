export interface Release {
  tracks: Track[];
  artist: String;
  title: String;
  url: String;
  imageUrl: String;
}

export interface Track {
  name: String;
  url: String;
  duration: String;
}
