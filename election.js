document.addEventListener("DOMContentLoaded", function() {
  var candidates = document.querySelector('#candidates')
  var refresh = document.querySelector('#refresh')
  refresh.addEventListener('click', function(e){
    window.location.reload()
  })

  $.ajax({
    url: "https://bb-election-api.herokuapp.com/",
    method: 'GET',
  }).done(function(data) {
    data.candidates.forEach(function(candidate){
      var li = document.createElement('li')
      li.innerHTML= (candidate.name+ ' : '+ candidate.votes)
      candidates.append(li)

      var form = document.createElement('form')
      li.insertAdjacentElement('afterend',form)

      var submitButt = document.createElement('button')
      submitButt.setAttribute("type", "submit")
      form.append(submitButt)

      var hiddenField = document.createElement('input')
      hiddenField.setAttribute("type", "hidden")
      hiddenField.value = candidate.name
      form.append(hiddenField)


      form.addEventListener('submit', function(e){
          e.preventDefault();
          $.ajax({
            url: "https://bb-election-api.herokuapp.com/vote",
            method: 'POST',
            data: {
              name: this.querySelector('input[type=hidden]').value
            }

          })
      })
    })
  })
});
