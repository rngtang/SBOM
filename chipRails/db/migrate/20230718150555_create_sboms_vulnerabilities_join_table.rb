class CreateSbomsVulnerabilitiesJoinTable < ActiveRecord::Migration[7.0]
  def change
    create_join_table :sboms, :vulnerabilities
    create_join_table :sboms, :sbom_components
  end
end
