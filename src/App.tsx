import { useEffect, useState } from "react";
import {
  ICountries,
  IPlaylistInfo,
  ITrackNameArtistPreviewUrl,
  getCountries,
  getPlaylistInfo,
  getPlaylistTracks,
} from "../api/webplayer";
import Select from "react-select";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Card,
  CardHeader,
  CardBody,
  Skeleton,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function WebPlayer() {
  const [playlistInfo, setPlaylistInfo] = useState<IPlaylistInfo | null>(null);
  const [playlistTracks, setPlaylistTracks] = useState<
    ITrackNameArtistPreviewUrl[]
  >([]);
  const [allCountries, setAllCountries] = useState<ICountries[]>([]);
  const [country, setCountry] = useState<ICountries | null>(null);

  useEffect(() => {
    const getAllCountries = async () => {
      const countries = await getCountries();
      setAllCountries(countries);
    };
    getAllCountries();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!country) {
      alert("Please select a country");
      return;
    }

    const playlistInfo = await getPlaylistInfo(country.label);
    const playlistTracks = await getPlaylistTracks(playlistInfo.id);
    setPlaylistTracks(playlistTracks);
    setPlaylistInfo(playlistInfo);
    console.log("label", country.label);
    // const data = country != null && (await getPlaylistInfo(country));
    // setPlaylistInfo(data);
  };

  const columns = [
    { name: "#", key: "ordem" },
    { name: "Play", key: "play" },
    { name: "Track", key: "track" },
  ];

  return (
    <div className="app-page w-full flex flex-col items-center py-10 bg-gradient-to-b from-blue-900 to-blue-00 h-screen">
      <div className="title flex items-center gap-6 my-10">
        <FontAwesomeIcon
          icon={faHeadphones}
          className="text-5xl text-slate-300"
        />
        <h1 className="font-rubik-glitch text-6xl text-slate-100">
          Music WebPlayer
        </h1>
      </div>
      <div className="form-container w-1/3 mt-10 mb-20">
        <form
          onSubmit={handleSubmit}
          className="form flex justify-center gap-4 w-full"
        >
          <Select
            placeholder="Select a country"
            className="w-full"
            options={allCountries}
            value={country}
            onChange={(newCountry) => {
              newCountry && setCountry(newCountry);
            }}
          />
          <Button type="submit" color="warning" className="font-semibold">
            <FontAwesomeIcon icon={faMagnifyingGlass} /> Buscar
          </Button>
        </form>
      </div>
      <div className="playlist w-full flex">
        <div className="left-section animate-fadeIn flex justify-center items-center w-[75%] p-5">
          <div className="table w-[65%]">
            <Table>
              <TableHeader>
                {columns.map((column) => (
                  <TableColumn
                    key={column.key}
                    className="text-lg text-center bg-blue-900 text-white"
                  >
                    {column.name}
                  </TableColumn>
                ))}
              </TableHeader>
              <TableBody emptyContent="No tracks to display">
                {playlistTracks.map((track, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <audio controls>
                        <source src={track.previewUrl} type="audio/mpeg" />
                      </audio>
                    </TableCell>
                    <TableCell>{track.trackNameAndArtist}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        {playlistTracks.length === 0 ? (
          <>
            <Card className="w-[250px] space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
          </>
        ) : (
          <div className="right-section animate-fadeIn flex justify-start items-start w-1/2 p-5">
            <Card className="py-4 w-[400px] h-[485px]">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">
                  {playlistInfo?.name}
                </p>
                <small className="text-default-500">Spotify</small>
                <h4 className="font-bold text-large">Web Radio</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <img src={playlistInfo?.images[0].url} />
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default WebPlayer;
