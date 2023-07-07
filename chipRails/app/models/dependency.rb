class Dependency < ApplicationRecord
    include ActiveModel::Serializers::JSON
    belongs_to :sbom
    serialize :dependsOn, Array
end