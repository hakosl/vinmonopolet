Drinks = new Mongo.Collection("drinks");


if (Meteor.isClient) {
  // counter starts at 0
  Template.body.helpers({
    products: function() {
      Drinks.find().limit(25);
    }
  })
}

if (Meteor.isServer) {
  Meteor.methods({
    
  })
  function parseCsv(parseString, config, callback){
    var i = 0;
    if(!config){
      config = {
        delimiter: ";",
        header: true,
        encoding: "ANSI",
        //preview: 0,
        dynamicTyping: true,
        skipEmtyLines: true,
        step: function(result){

          /*if(typeof result.data[0].Alkohol === "number" && typeof result.data[0].Literpris === "number"){
            result.data[0].Alkoholperliterpris = (result.data[0].Alkohol * 100 / result.data[0].Literpris);
          }*/

          if(i < 5){console.log(result.data[0]); i++;};
          Drinks.insert(result.data);
        }
      }
    }
    Drinks.remove({});
    Baby.parse(parseString, config);
    console.log(Drinks.findOne());
    console.log("drinks found")
  }

  function getFile(url){
    return HTTP.get(url)
  }
  Meteor.startup(function () {
    // code to run on server at startup
    var url = "http://www.vinmonopolet.no/api/produkter";
    var stringToParse = "Datotid;Varenummer;Varenavn;Volum;Pris;Literpris;Varetype;Produktutvalg;Butikkategori;Fylde;Friskhet;Garvestoffer;Bitterhet;Sodme;Farge;Lukt;Smak;Passertil01;Passertil02;Passertil03;Land;Distrikt;Underdistrikt;Argang;Rastoff;Metode;Alkohol;Sukker;Syre;Lagringsgrad;Produsent;Grossist;Distributor;Emballasjetype;Korktype;Vareurl\n2015-09-09T00:24:16;1101;Løiten Linie;0,70;399,90;571,30;Akevitt;Basisutvalget;Butikkategori 3;0;0;0;0;0;Lys gyllen.;Aroma med preg av vanilje, sitrus og karve.;Preg av vanilje, sitrus og karve, innslag av karamell og fat. God fylde.;;;;Norge;Øvrige;Øvrige;;Poteter, krydder;16 mnd på fat;41,50;4,50;Ukjent;;;Arcus AS;Vectura AS;Engangsflasker av glass;;http://www.vinmonopolet.no/vareutvalg/varedetaljer/sku-1101"
    

    csvFile = getFile(url);

    csvFile.content = csvFile.content.replace(/,/g, ".")
    //console.log(csvFile.content);
    parseCsv(csvFile.content);
    
  });
}
