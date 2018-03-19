using Router, ChirpsController

route("/") do
  Router.serve_static_file("welcome.html")
  # Router.respond_with_html("home", "home_page.md")
end

route("/chirps", ChirpsController.index)
route("/chirps/new", ChirpsController.new)
route("/chirps", ChirpsController.create, method = POST)
