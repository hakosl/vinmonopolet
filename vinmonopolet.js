Drinks = new Mongo.Collection("drinks");


if (Meteor.isClient) {
  // counter starts at 0
  Template.body.helpers({
    products: 
    [
      {
        id: 1,
        name: "Vodka",
        price: 400.00,
        volume: 1.000,
        alcoholPercentage: 40.00,
        alcholPerLiter: (1.00 * 40.00 / 100.00),
        crownPerAlcoholPerLiter: (400.00 / (1.00 * 40.00 / 100.00))
      }
    ]
  })
}

if (Meteor.isServer) {
  Meteor.methods({
    
  })
  function parseCsv(parseString, config, callback){
    if(!config){
      i = 0;
      config = {
        delimiter: ";",
        header: true,
        encoding: "ANSI",
        //preview: 0,
        dynamicTyping: true,
        skipEmtyLines: true,
        error: function(error, file){
          console.log("error: " + error);
        },
        step: function(result){
          if(i < 10){
            console.log(result.data[0]);
            i++;
          }
        }
      }
    }
    Baby.parse(parseString, config);

    console.log(Drinks.findOne({}));
  }

  function getFile(url, callback){
    HTTP.get(url,{}, callback)
  }
  Meteor.startup(function () {
    // code to run on server at startup
    var url = "http://www.vinmonopolet.no/api/produkter";
    var stringToParse = "Datotid;Varenummer;Varenavn;Volum;Pris;Literpris;Varetype;Produktutvalg;Butikkategori;Fylde;Friskhet;Garvestoffer;Bitterhet;Sodme;Farge;Lukt;Smak;Passertil01;Passertil02;Passertil03;Land;Distrikt;Underdistrikt;Argang;Rastoff;Metode;Alkohol;Sukker;Syre;Lagringsgrad;Produsent;Grossist;Distributor;Emballasjetype;Korktype;Vareurl\n2015-09-09T00:24:16;1101;Løiten Linie;0,70;399,90;571,30;Akevitt;Basisutvalget;Butikkategori 3;0;0;0;0;0;Lys gyllen.;Aroma med preg av vanilje, sitrus og karve.;Preg av vanilje, sitrus og karve, innslag av karamell og fat. God fylde.;;;;Norge;Øvrige;Øvrige;;Poteter, krydder;16 mnd på fat;41,50;4,50;Ukjent;;;Arcus AS;Vectura AS;Engangsflasker av glass;;http://www.vinmonopolet.no/vareutvalg/varedetaljer/sku-1101"
    

    getFile(url, function(error, result){
      parseCsv(result.content);
    });

    
  });
}
