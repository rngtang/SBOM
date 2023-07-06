class Dependency < ApplicationRecord
    belongs_to :sbom
    serialize :dependsOn, Array
end