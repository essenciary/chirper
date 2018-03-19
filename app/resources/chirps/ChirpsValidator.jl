module ChirpsValidator

using SearchLight, Validation

function not_empty(field::Symbol, m::T, args::Vararg{Any})::ValidationResult where {T<:AbstractModel}
  isempty(getfield(m, field)) && return ValidationResult(invalid, :not_empty, "should not be empty")

  ValidationResult(valid)
end

function minimum_length(field::Symbol, m::T, args::Vararg{Any})::ValidationResult where {T<:AbstractModel}
  length(getfield(m, field)) < 20 && return ValidationResult(invalid, :minimum_length, "should be at least 20 letters long")

  ValidationResult(valid)
end

end
