module ChirpsChannel

using Channels, App
@dependencies


function subscribe()
  Channels.subscribe(wsclient(@params), :chirps)
  "OK"
end

end
