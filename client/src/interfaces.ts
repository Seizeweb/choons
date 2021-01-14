export interface Location {
  state: {
    list: ListInterface;
  };
}

export interface ListInterface {
  _id: string;
  name: string;
  releases: ReleaseInterface[];
  lastUpdated: Date;
  owner: string;
  lastReleasesArtwork: string;
}

export interface ReleaseInterface {
  _id: string;
  tracks: Track[];
  artist: string;
  title: string;
  url: string;
  imageUrl: string;
}

export interface Track {
  name: string;
  url: string;
  duration: string;
}
