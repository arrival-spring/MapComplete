import State from "../../State";
import {Utils} from "../../Utils";

export class Geocoding {

    private static readonly host = "https://nominatim.openstreetmap.org/search?";

    static Search(query: string,
                  handleResult: ((places: {
                      display_name: string, lat: number, lon: number, boundingbox: number[],
                      osm_type: string, osm_id: string
                  }[]) => void),
                  onFail: (() => void)) {
        const b = State.state.currentBounds.data;
        const url = Geocoding.host + "format=json&limit=1&viewbox=" +
            `${b.getEast()},${b.getNorth()},${b.getWest()},${b.getSouth()}` +
            "&accept-language=nl&q=" + query;
        Utils.downloadJson(
            url)
            .then(handleResult)
            .catch(onFail);
    }
}
