module ChirpsController

using App, SearchLight, Chirps, Validation
@dependencies

# before_hook() = println("I run before the action")
# after_hook() = println("I run after the action")
# rescue_hook(ex::Exception) = redirect_to("/omg")

const CHIRPS_PER_PAGE = 20

function index()
  total_chirps = SearchLight.count(Chirp)
  chirps = SearchLight.find(Chirp, SQLQuery(limit = CHIRPS_PER_PAGE, offset = Int(@params(:page, 0)) * CHIRPS_PER_PAGE, order = "created_at DESC"))
  respond_with_html(:chirps, :index, chirps = chirps, chirps_per_page = CHIRPS_PER_PAGE, total_chirps = total_chirps)
end

function new(chirp = Chirp(content = ""))
  respond_with_html(:chirps, :new, chirp = chirp)
end

function create()
  chirp = Chirp(content = @params(:content))
  if Validation.validate!(chirp) && SearchLight.save(chirp)
    flash("Your chirp was saved")
    redirect_to(:get_chirps)
  else
    new(chirp)
  end
end

end
