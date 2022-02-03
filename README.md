# dnsh-biodiversity
Map tool developed for a rapid validation of construction projects against the Do No Significant Harm (DNSH) criteria of the EU Taxonomy for biodiversity. The tool is limited to Germany at time of writing.

The deployed version of this tool can be consulted at: https://nathx.github.io/dnsh-biodiversity/

The new construction is not built on one of the following:
| Category   |      Criteria description      |  Data source |
|----------|:-------------:|------:|
| Soil |  Arable land and crop land with a moderate to high level of soil fertility and below ground biodiversity as referred to the EU LUCAS survey | [LUCAS](https://sdi.eea.europa.eu/catalogue/fise/api/records/75033661-550e-4c36-b1b7-b502ec545aa7) |
| Endangered species |    Greenfield land of recognised high biodiversity value and land that serves as habitat of endangered species (flora and fauna) listed on the European Red List    |   [Natura 2000](https://land.copernicus.eu/local/natura/n2k-2018) |
| Forestry | Land matching the definition of forest as set out in national law used in the national greenhouse gas inventory, or where not available, is in accordance with the FAO definition of forest. |  [Copernicus - Forest type](https://land.copernicus.eu/pan-european/high-resolution-layers/forests/forest-type-1/status-maps)   |
    
## To run the app locally

- Download or clone the repo
- Execute the following code from the project repository in a terminal
  > npm install
  >
  >npm run start

- Navigate to `http://localhost:3000/` to access the running application
