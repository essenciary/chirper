module ViewHelper

using Genie, Helpers, App

export output_flash, chirps_pagination

function output_flash(params::Dict{Symbol,Any}) :: String
  ! isempty( flash(params) ) ? """<div class="form-group alert alert-info">$(flash(params))</div>""" : ""
end

function chirps_pagination(total_chirps::Int, chirps_per_page::Int) :: String
  total_chirps < chirps_per_page && return ""
  mapreduce(*, [Int(i) for i in 0:floor(total_chirps/chirps_per_page)]) do i
    """<a href="/chirps?page=$i">$(i+1)</a> """
  end
end

end
