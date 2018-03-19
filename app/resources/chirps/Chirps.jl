module Chirps

using SearchLight, Faker, ChirpsValidator

export Chirp

mutable struct Chirp <: AbstractModel
  ### internals
  _table_name::String
  _id::String

  ### fields
  id::Nullable{SearchLight.DbId}
  content::String
  created_at::DateTime

  ### validator
  validator::ModelValidator

  ### relations
  # belongs_to::Vector{SearchLight.SQLRelation}
  # has_one::Vector{SearchLight.SQLRelation}
  # has_many::Vector{SearchLight.SQLRelation}

  ### callbacks
  # before_save::Function
  # after_save::Function
  # on_dehydration::Function
  # on_hydration::Function
  # after_hydration::Function

  ### scopes
  # scopes::Dict{Symbol,Vector{SearchLight.SQLWhereEntity}}

  ### constructor
  Chirp(;
    id = Nullable{SearchLight.DbId}(),
    content = "",
    created_at = Dates.now(),

    validator = ModelValidator([
      ValidationRule(:content, ChirpsValidator.not_empty),
      ValidationRule(:content, ChirpsValidator.minimum_length)
    ])

    # belongs_to = [],
    # has_one = [],
    # has_many = [],

    # before_save = (m::Chirp) -> warn("Not implemented"),
    # after_save = (m::Chirp) -> warn("Not implemented"),
    # on_dehydration = (m::Chirp, field::Symbol, value::Any) -> warn("Not implemented"),
    # on_hydration = (m::Chirp, field::Symbol, value::Any) -> warn("Not implemented")
    # after_hydration = (m::Chirp, field::Symbol, value::Any) -> warn("Not implemented")

    # scopes = Dict{Symbol,Vector{SearchLight.SQLWhereEntity}}()

  ) = new("chirps", "id",
          id, content, created_at,
          validator
          # belongs_to, has_one, has_many,
          # before_save, after_save, on_dehydration, on_hydration, after_hydration
          # scopes
          )
end

function random()
  Chirp(content = Faker.sentence())
end

end
