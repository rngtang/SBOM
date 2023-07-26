class Dependency < ApplicationRecord
    include ActiveModel::Serializers::JSON

    # One-to-one associations
    belongs_to :sbom
    belongs_to :sbomComponent, optional: true;

    # Creates array
    serialize :dependsOn, Array
end