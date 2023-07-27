class Dependency < ApplicationRecord
    include ActiveModel::Serializers::JSON

    # One-to-one associations
    belongs_to :sbom
    belongs_to :sbomComponent, optional: true;

    # Makes dependsOn an array
    serialize :dependsOn, Array
end