class Dependency < ApplicationRecord
    has_many :license, :dependency, :property
    belongs_to :sbom
end
