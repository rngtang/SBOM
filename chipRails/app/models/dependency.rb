class Dependency < ApplicationRecord
    include ActiveModel::Serializers::JSON

    # One-to-one associations
    belongs_to :sbom

    # Creates array
    serialize :dependsOn, Array
end