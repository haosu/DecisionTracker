//table

ListMaker = function(){
  return {
    list : [],

    add : function(name, value, time) {
      // add to the server
      $.post("/decisions", 
        { decision : {
          name : name,
          value : value,
          time : time }
        }, function(){
          console.log('succ');
        });

      //emit data changed
      $(this).trigger("data");
    },

    getAll : function(comparator) {
      // get from the server
      // /decisions

      var toReturn = {};

      $.ajax("/decisions", {
        async : false,
        success : function(data) {
          toReturn = data;
        }
      });

      
      if(!comparator) {
        return toReturn;
      }
      
      return toReturn.sort(comparator);
    }

    // keep this in sorted order
  }
};

ListItem = function() {
  return {
    name : "",
    // points 
    value : 0,
    // minutes
    time : 0,

    worth : 0,

    initialize : function(name, value, time) {
      this.name = name;
      this.value = value;
      this.time = time;
      this.worth = this.value/this.time;
    }

  };
};


ListView = function() {
  return {
    model : {},

    container : "",
    entryTemplate : {},
    currentComparator : {},

    initialize : function() {
      // set the model
      this.model = new ListMaker();

      // create id
      var id = "a" + Math.floor(Math.random()*100);
      // do view setup
      this.container = Handlebars.compile($("#list-template").html())({
        id : id
      });
      $("body").append(this.container);
      this.container = $("#"+id);
      this.entryTemplate = Handlebars.compile($("#entry-template").html());

      // set the comparator
      this.currentComparator = this.makeComparator("worth");

      $(this.model).bind("data", this.show.bind(this));

      this.bindButtons();
    },

    bindButtons : function() {
      $(this.container).find("button.new").click(this.onClick.bind(this));

      $(this.container).find("button.sort").click(this.onSort.bind(this));
    },

    onClick : function() {
      var name = this.container.find("input.name").val();
      var value = this.container.find("input.value").val();
      var time = this.container.find("input.time").val();

      this.model.add(name, value, time);
    },

    onSort : function(event) {
      var sortType = $(event.currentTarget).attr("data-action");

      this.currentComparator = this.makeComparator(sortType);
      this.show();
    },

    show : function() {
      this.container.find("tbody").empty();

      var list = this.model.getAll(this.currentComparator);

      var val = "";
      for(var i=0; i<list.length; i++) {
        val = list[i];
        //prettyTime = val.created_at

        $("tbody").append(
          this.entryTemplate(val)
        );
      }
    },

    makeComparator : function(property) {
      return function(a, b) {
        return a[property] - b[property];
      }
    }

  }
}

$(function(){
  Handlebars.registerHelper('shortDate', function(date) {
    console.log(date, typeof date);
    return new Date(Date.parse(date)).toDateString();
  });

  var view = new ListView();
  view.initialize();
  view.show();
});



