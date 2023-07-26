class ChangeNullColumnSboms < ActiveRecord::Migration[7.0]
  def change
    # Makes the SBOM not dependent on a user and vulnerabilities not dependent on an SBOM
    change_column_null :sboms, :user_id, true
    change_column_null :vulnerabilities, :sbom_id, true
    change_column_null :sbom_components, :sbom_id, true
  end
end
